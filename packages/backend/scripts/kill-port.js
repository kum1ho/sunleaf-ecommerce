const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const PORT = process.env.PORT || 3001;

async function killPort(port) {
  try {
    console.log(`🔍 Перевірка порту ${port}...`);
    
    // Для Windows
    if (process.platform === 'win32') {
      try {
        const { stdout } = await execPromise(`netstat -ano | findstr :${port}`);
        
        if (stdout) {
          const lines = stdout.split('\n').filter(line => line.includes('LISTENING'));
          
          for (const line of lines) {
            const parts = line.trim().split(/\s+/);
            const pid = parts[parts.length - 1];
            
            if (pid && pid !== '0') {
              console.log(`🔪 Завершення процесу на порту ${port} (PID: ${pid})...`);
              await execPromise(`taskkill /PID ${pid} /F`);
              console.log(`✅ Процес ${pid} успішно завершено`);
            }
          }
        } else {
          console.log(`✅ Порт ${port} вільний`);
        }
      } catch (error) {
        // Порт вільний або помилка
        console.log(`✅ Порт ${port} вільний`);
      }
    } 
    // Для Linux/Mac
    else {
      try {
        const { stdout } = await execPromise(`lsof -ti:${port}`);
        
        if (stdout) {
          const pids = stdout.trim().split('\n');
          
          for (const pid of pids) {
            if (pid) {
              console.log(`🔪 Завершення процесу на порту ${port} (PID: ${pid})...`);
              await execPromise(`kill -9 ${pid}`);
              console.log(`✅ Процес ${pid} успішно завершено`);
            }
          }
        } else {
          console.log(`✅ Порт ${port} вільний`);
        }
      } catch (error) {
        // Порт вільний
        console.log(`✅ Порт ${port} вільний`);
      }
    }
  } catch (error) {
    console.error(`❌ Помилка при очищенні порту ${port}:`, error.message);
  }
}

// Запуск
killPort(PORT).then(() => {
  console.log(`🚀 Порт ${PORT} готовий до використання!\n`);
}).catch(err => {
  console.error('Критична помилка:', err);
  process.exit(1);
});
