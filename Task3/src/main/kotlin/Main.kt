import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class DiscordMessage(val content: String)

fun main() = runBlocking {
    val client = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(Json { prettyPrint = true })
        }
    }

    val webhookUrl = "https://discord.com/api/webhooks/1358702256668545034/cgrP-sq8VcGylDABKTK-1wGBArf7w89lmy6ch0Olk_Gx1BfagQ0msu7I7l5ZxnrdpLIe" // <-- wklej tutaj swój URL

    val message = DiscordMessage(content = "Paweł Wacławik")

    val response = client.post(webhookUrl) {
        contentType(ContentType.Application.Json)
        setBody(message)
    }

    println("Status: ${response.status}")
    println("Response: ${response.body<String>()}")

    client.close()
}
