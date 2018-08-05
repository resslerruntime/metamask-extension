const JsonRpcEngine = require("json-rpc-engine");
const scaffoldMiddleware = require("eth-json-rpc-middleware/scaffold");
const providerAsMiddleware = require("eth-json-rpc-middleware/providerAsMiddleware");
const GanacheCore = require("ganache-core");

module.exports = {
  createEngineForTestData,
  providerFromEngine,
  scaffoldMiddleware,
  createTestProviderTools,
  getTestSeed,
  getTestAccounts
};

function getTestSeed() {
  return "people carpet cluster attract ankle motor ozone mass dove original primary mask";
}

function getTestAccounts() {
  return [
    {
      address: "0x88bb7F89eB5e5b30D3e15a57C68DBe03C6aCCB21",
      key: Buffer.from(
        "254A8D551474F35CCC816388B4ED4D20B945C96B7EB857A68064CB9E9FB2C092",
        "hex"
      )
    },
    {
      address: "0x1fe9aAB565Be19629fF4e8541ca2102fb42D7724",
      key: Buffer.from(
        "6BAB5A4F2A6911AF8EE2BD32C6C05F6643AC48EF6C939CDEAAAE6B1620805A9B",
        "hex"
      )
    },
    {
      address: "0xbda5c89aa6bA1b352194291AD6822C92AbC87c7B",
      key: Buffer.from(
        "9B11D7F833648F26CE94D544855558D7053ECD396E4F4563968C232C012879B0",
        "hex"
      )
    }
  ];
}

function createEngineForTestData() {
  return new JsonRpcEngine();
}

function providerFromEngine(engine) {
  const provider = { sendAsync: engine.handle.bind(engine) };
  return provider;
}

function createTestProviderTools(opts = {}) {
  const engine = createEngineForTestData();
  // handle provided hooks
  engine.push(scaffoldMiddleware(opts.scaffold || {}));
  // handle block tracker methods
  engine.push(
    providerAsMiddleware(
      GanacheCore.provider({
        mnemonic: getTestSeed()
      })
    )
  );
  // wrap in standard provider interface
  const provider = providerFromEngine(engine);
  return { provider, engine };
}
