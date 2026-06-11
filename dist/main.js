"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseConnection_1 = require("./DatabaseConnection");
function moduloPacientes() {
    console.log("\n===== Módulo de Pacientes =====");
    const db = DatabaseConnection_1.DatabaseConnection.getInstance();
    db.connect();
    db.query("SELECT * FROM pacientes WHERE activo = true");
    db.query("SELECT nombre, edad FROM pacientes WHERE id = 42");
    console.log("Estado:", db.getStatus());
}
function moduloCitas() {
    console.log("\n===== Módulo de Citas =====");
    const db = DatabaseConnection_1.DatabaseConnection.getInstance();
    db.query("SELECT * FROM citas WHERE fecha = '2026-06-08'");
    console.log("Estado:", db.getStatus());
}
function moduloInventario() {
    console.log("\n===== Módulo de Inventario =====");
    const db = DatabaseConnection_1.DatabaseConnection.getInstance();
    db.query("SELECT medicamento, cantidad FROM inventario WHERE stock < 10");
    console.log("Estado:", db.getStatus());
}
function verificarSingleton() {
    console.log("\n===== Verificación de Unicidad =====");
    const instancia1 = DatabaseConnection_1.DatabaseConnection.getInstance();
    const instancia2 = DatabaseConnection_1.DatabaseConnection.getInstance();
    const instancia3 = DatabaseConnection_1.DatabaseConnection.getInstance();
    const sonIguales = instancia1 === instancia2 && instancia2 === instancia3;
    console.log(`¿Las tres referencias apuntan al mismo objeto? → ${sonIguales}`);
}
console.log("╔══════════════════════════════════════════════╗");
console.log("║  Sistema Hospitalario — Patrón Singleton     ║");
console.log("╚══════════════════════════════════════════════╝");
moduloPacientes();
moduloCitas();
moduloInventario();
verificarSingleton();
const db = DatabaseConnection_1.DatabaseConnection.getInstance();
db.disconnect();
console.log("\nFin del programa.");
