package models

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Name        string
    Price       float64
    Description string
    CategoryID  uint
    Category    Category
}

type Category struct {
    gorm.Model
    Name     string
    Products []Product
}

type Customer struct {
    gorm.Model
    Name    string
    Email   string
    Orders  []Order
}

type Order struct {
    gorm.Model
    CustomerID uint
    Customer   Customer
    Products   []Product `gorm:"many2many:order_products;"`
}

type Supplier struct {
    gorm.Model
    Name     string
    Products []Product `gorm:"many2many:supplier_products;"`
}
