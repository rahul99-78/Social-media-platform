const response = (res, status, success, message, data = null) => {
  return res.status(status).json({
    success : success,
    message:message,
    data:data
  });
}

export {response}
