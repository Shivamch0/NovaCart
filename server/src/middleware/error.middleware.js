export const errorMiddleWare = (err , req , res , next) => {
    const statusCode = err.status || 500;
  
  console.error(`[Error] ${statusCode} - ${err.message}`);
  
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
}