package database

import (
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
	"myapp/models"
)

var DB *gorm.DB

func Connect() {
    db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database")
    }

    db.AutoMigrate(&models.Product{}, &models.Category{}, &models.Customer{}, &models.Order{}, &models.Supplier{})

    DB = db
}
