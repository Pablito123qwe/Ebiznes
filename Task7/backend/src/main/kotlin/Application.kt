package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.http.*
import kotlinx.serialization.*
import kotlinx.serialization.json.*

// ===== MODELE DANYCH =====

@Serializable
data class Produkt(val id: Int, val nazwa: String, val cena: Double)

@Serializable
data class ProduktyWrapper(val produkty: List<Produkt>)

@Serializable
data class Platnosc(val dane: List<Produkt>)

// ===== START APLIKACJI =====

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        // 🔄 JSON serializacja
        install(ContentNegotiation) {
            json()
        }


        install(CORS) {
            anyHost() // do devu – w produkcji lepiej np. host("localhost:3000")
            allowHeader(HttpHeaders.ContentType)
            allowMethod(HttpMethod.Get)
            allowMethod(HttpMethod.Post)
        }

        // 🚀 Routing
        routing {
            // GET /produkty – zwraca listę produktów
            get("/produkty") {
                val produkty = listOf(
                    Produkt(1, "Mleko", 4.5),
                    Produkt(2, "Chleb", 3.0),
                    Produkt(3, "Ser", 6.2)
                )
                call.respond(ProduktyWrapper(produkty))
            }

            // POST /platnosc – przyjmuje dane płatności
            post("/platnosc") {
                val platnosc = call.receive<Platnosc>()
                println("Otrzymano płatność za: ${platnosc.dane.map { it.nazwa }}")
                call.respondText("OK")
            }
        }
    }.start(wait = true)
}
