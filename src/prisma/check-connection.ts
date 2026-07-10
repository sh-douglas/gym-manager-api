import prisma from "./prisma.js";

async function checkConnection() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.error("Falha ao conectar com o banco de dados.", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkConnection();
