const client = require("../db/redisConnection");
const { promisify } = require("util");

class RedisUtils {
  static #getAsync = promisify(client.get).bind(client);
  static #setAsync = promisify(client.set).bind(client);
  static #delAsync = promisify(client.del).bind(client);

  static async salvaPonto(usuarioId, dataPonto, horarios) {
    const ponto = { data_ponto: dataPonto, horarios: horarios };

    const result = await this.#setAsync(
      `ponto_batido:${usuarioId}`,
      JSON.stringify(ponto),
      "EX",
      72000
    );

    return result;
  }

  static async getPonto(usuarioId) {
    const ponto = await this.#getAsync(`ponto_batido:${usuarioId}`);

    return ponto;
  }
}

module.exports = RedisUtils;