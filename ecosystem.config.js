module.exports = {
  apps: [
    {
      name: 'scryptaTip',
      script: 'index.js',
      cwd: '/home/bot/scryptaTip',
      instance_id_env: '0',
      watch: true,
      ignore_watch : ['node_modules', 'Logs', 'Downloads', '.git'],
      error_file:
        '/home/bot/scryptaTip/Logs/discord-err.log',
      out_file: '/home/bot/scryptaTip/Logs/discord-out.log',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};