const errorHandler = (err, request, response, next) => {
  if (err?.message.includes("Not Found")) {
    console.error(err.stack);
    return response.status(404).json({ message: err.message });
  } else if (err?.name.includes("ZodError")) {
    console.error(err.stack);
    return response.status(400).json({ message: err.issues });
  }

  console.error(err.stack);
  response.status(500).json({ message: "an error occurred" });
};

export default errorHandler;
