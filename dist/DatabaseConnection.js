"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
class DatabaseConnection {
    constructor(connectionString) {
        this.isConnected = false;
        this.queryCount = 0;
        this.connectionString = connectionString;
        console.log(`[Singleton] Instancia creada con: ${connectionString}`);
    }
    static getInstance(connectionString = "hospital_db://localhost:5432") {
        if (DatabaseConnection.instance === null) {
            DatabaseConnection.instance = new DatabaseConnection(connectionString);
        }
        else {
            console.log("[Singleton] Instancia ya existente — reutilizando.");
        }
        return DatabaseConnection.instance;
    }
    connect() {
        if (this.isConnected) {
            console.log("[DB] Ya existe una conexión activa.");
            return;
        }
        this.isConnected = true;
        console.log(`[DB] Conexión establecida → ${this.connectionString}`);
    }
    query(sql) {
        if (!this.isConnected) {
            throw new Error("[DB] Error: No hay conexión activa. Llame a connect() primero.");
        }
        this.queryCount++;
        const result = `[Query #${this.queryCount}] Ejecutado: "${sql}"`;
        console.log(result);
        return result;
    }
    disconnect() {
        if (!this.isConnected) {
            console.log("[DB] La conexión ya estaba cerrada.");
            return;
        }
        this.isConnected = false;
        console.log("[DB] Conexión cerrada correctamente.");
    }
    getStatus() {
        return `Conexión: ${this.connectionString} | Activa: ${this.isConnected} | Queries realizados: ${this.queryCount}`;
    }
    static resetInstance() {
        DatabaseConnection.instance = null;
        console.log("[Singleton] Instancia reseteada (solo para testing).");
    }
}
exports.DatabaseConnection = DatabaseConnection;
// ─── Instancia única (estática y privada) ───────────────────────────────────
DatabaseConnection.instance = null;
