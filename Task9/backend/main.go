package main

import (
    "io"
    "log"
    "net/http"
    "bytes"
    "encoding/json"
)

type UserRequest struct {
    Message string `json:"message"`
}

func handleChat(w http.ResponseWriter, r *http.Request) {
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }


    var userReq UserRequest
    if err := json.NewDecoder(r.Body).Decode(&userReq); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }


    jsonValue, err := json.Marshal(userReq)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }


    fastApiURL := "http://localhost:8000/chat"
    resp, err := http.Post(fastApiURL, "application/json", bytes.NewBuffer(jsonValue))
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer resp.Body.Close()

    
    w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
    w.WriteHeader(resp.StatusCode)
    io.Copy(w, resp.Body)
}

func main() {
    http.HandleFunc("/chat", handleChat)
    log.Println("Go backend running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
