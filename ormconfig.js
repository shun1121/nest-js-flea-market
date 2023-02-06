module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true,
  entities: ['dist/entities/*.entity.js'], //マイグレーションファイルの設定の際にどのentityを読み込むかの設定
  migrations: ['dist/migrations/*.js'], //どのマイルレーションファイルを使用してマイグレーションを行うか
  cli: {
    entitesDir: 'src/entities',
    migrationsDir: 'src/migrations', //cliによって作成されるファイルの出力先
  },
};
