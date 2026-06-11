export class DatabaseConnection {
  // ─── Instancia única (estática y privada) ───────────────────────────────────
  private static instance: DatabaseConnection | null = null;

  // ─── Estado interno de la conexión ──────────────────────────────────────────
  private connectionString: string;
  private isConnected: boolean = false;
  private queryCount: number = 0;

  private constructor(connectionString: string) {
    this.connectionString = connectionString;
    console.log(`[Singleton] Instancia creada con: ${connectionString}`);
  }

  public static getInstance(connectionString: string = "hospital_db://localhost:5432"): DatabaseConnection {
    if (DatabaseConnection.instance === null) {
      DatabaseConnection.instance = new DatabaseConnection(connectionString);
    } else {
      console.log("[Singleton] Instancia ya existente — reutilizando.");
    }
    return DatabaseConnection.instance;
  }

  public connect(): void {
    if (this.isConnected) {
      console.log("[DB] Ya existe una conexión activa.");
      return;
    }
    this.isConnected = true;
    console.log(`[DB] Conexión establecida → ${this.connectionString}`);
  }

  public query(sql: string): string {
    if (!this.isConnected) {
      throw new Error("[DB] Error: No hay conexión activa. Llame a connect() primero.");
    }
    this.queryCount++;
    const result = `[Query #${this.queryCount}] Ejecutado: "${sql}"`;
    console.log(result);
    return result;
  }

  public disconnect(): void {
    if (!this.isConnected) {
      console.log("[DB] La conexión ya estaba cerrada.");
      return;
    }
    this.isConnected = false;
    console.log("[DB] Conexión cerrada correctamente.");
  }

  public getStatus(): string {
    return `Conexión: ${this.connectionString} | Activa: ${this.isConnected} | Queries realizados: ${this.queryCount}`;
  }

  public static resetInstance(): void {
    DatabaseConnection.instance = null;
    console.log("[Singleton] Instancia reseteada (solo para testing).");
  }
}