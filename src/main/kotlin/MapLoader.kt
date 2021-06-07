import spark.Request
import spark.Response
import java.io.File

class MapLoader {
    fun test(req: Request, res: Response): String {
        val data = File("map.json").readText();

        println(data);
        return data;
    }
}
