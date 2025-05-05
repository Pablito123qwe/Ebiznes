plugins {
    kotlin("jvm") version "1.9.0"
    kotlin("plugin.serialization") version "1.9.0"
    application
}

application {
    mainClass.set("com.example.ApplicationKt")
}

repositories {
    mavenCentral()
}

kotlin {
    jvmToolchain(17) // Ustawia JDK 17 dla kompilacji
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:2.3.0")
    implementation("io.ktor:ktor-server-netty-jvm:2.3.0")
    implementation("io.ktor:ktor-server-content-negotiation:2.3.0")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.1")
    implementation("ch.qos.logback:logback-classic:1.4.11")
    implementation("io.ktor:ktor-server-cors:2.3.0")

}
