import spark.Spark.*

fun main() {
    get("/") { req, res -> "hello!" }
    put("/map") { req, res ->  }
}