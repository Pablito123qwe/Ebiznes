package controllers

import javax.inject._
import play.api._
import play.api.mvc._

@Singleton
class ProductController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  // Lista produktów, którą chcemy wyświetlić
  val products = List("Laptop", "Smartphone", "Tablet", "Headphones", "Smartwatch")

  // Akcja zwracająca listę produktów w formie prostego tekstu (np. w konsoli lub przeglądarce)
  def getProductsText: Action[AnyContent] = Action {
    Ok(products.mkString(", "))  // Zwrócenie produktów jako tekst
  }
}
