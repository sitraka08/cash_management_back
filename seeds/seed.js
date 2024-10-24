import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

const main = async () => {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);
    const users = await prisma.user.count();
    if (users === 0) {
      const admin = await prisma.user.create({
        data: {
          first_name: "Admin",
          email: "admin@gmail.com",
          role: "admin",
          password: hashedPassword,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
