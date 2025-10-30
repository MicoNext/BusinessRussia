module.exports = {
  apps: [{
    name: 'business_russia',
    script: 'npm',
    args: 'run start',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    watch: false,
    autorestart: true,
    max_restarts: 10000,
    restart_delay: 3000,
    time: true
  }]
}