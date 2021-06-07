import spark.Spark.*
import java.io.File

fun main(args: Array<String>) {
    staticFiles.location("/public")

    var map = Map();
    val file = File("map.json");
    val isCreated:Boolean = file.createNewFile();
    file.writeText("{\"map\": \"\"}")

    get("/") { req, res -> res.redirect("index.html") }
    get("/game") { req, res -> res.redirect("game.html") }
    get("/editor") { req, res -> res.redirect("editor.html") }
    post("/add") { req, res -> map.add(req, res) }
    post("/load") { req, res -> map.load(req, res) }
}
