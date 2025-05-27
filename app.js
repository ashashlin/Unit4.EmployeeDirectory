import express from "express";
import employees from "#db/employees";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.status(200).json({ employees });
});

// need to put this above "/employees/:id" bc a request is handled by the first handler with a matching route
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  const employee = employees[randomIndex];

  res.status(200).json({ employee });
});

app.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((employee) => employee.id === Number(id));

  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee with id ${id} cannot be found` });
  }

  res.status(200).json({ employee });
});

export default app;
