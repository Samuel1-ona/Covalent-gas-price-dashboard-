import { useState } from "react";
import { CovalentClient } from "@covalenthq/client-sdk";
import "./App.css";
import {
  Select,
  SelectItem,
  TextInput,
  Title,
  Grid,
  Col,
  Card,
  Text,
  Metric,
  Button,
  Accordion, AccordionBody, AccordionHeader, AccordionList
} from "@tremor/react";

function App() {
  const [key, setKey] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState({ first: "", second: "", third: "" });

  const allBlockchains = [
    "arbitrum-goerli",
    "arbitrum-mainnet",
    "arbitrum-nova-mainnet",
    "arbitrum-sepolia",
    "aurora-mainnet",
    "avalanche-beam-mainnet",
    "avalanche-dexalot-mainnet",
    "avalanche-dos",
    "avalanche-loco-legends-mainnet",
    "avalanche-mainnet",
    "avalanche-mainnet",
    "avalanche-mainnet",
    "avalanche-meld-mainnet",
    "avalanche-numbers",
    "avalanche-shrapnel-mainnet",
    "avalanche-step-network",
    "avalanche-uptn",
    "avalanche-xanachain",
    "avalanche-xplus",
    "axie-mainnet",
    "base-mainnet",
    "bnb-antimatter-mainnet",
    "bnb-fncy-mainnet",
    "bnb-meta-apes-mainnet",
    "bnb-opbnb-mainnet",
    "boba-bnb-mainnet",
    "boba-goerli",
    "boba-mainnet",
    "bsc-mainnet",
    "btc-mainnet",
    "canto-mainnet",
    "covalent-internal-network-v1",
    "cronos-mainnet",
    "defi-kingdoms-mainnet",
    "emerald-paratime-mainnet",
    "eth-goerli",
    "eth-holesky",
    "eth-mainnet",
    "eth-sepolia",
    "evmos-mainnet",
    "fantom-mainnet",
    "flarenetworks-canary-mainnet",
    "flarenetworks-flare-mainnet",
    "gather-mainnet",
    "gnosis-mainnet",
    "harmony-mainnet",
    "horizen-eon-mainnet",
    "kcc-mainnet",
    "linea-mainnet",
    "loot-mainnet",
    "lumoz-decibling",
    "lumoz-public-zksync-v2",
    "lumoz-stark-sport",
    "mantle-mainnet",
    "matic-mainnet",
    "matic-mumbai",
    "meter-mainnet",
    "metis-mainnet",
    "metis-stardust",
    "milkomeda-a1-mainnet",
    "milkomeda-c1-devnet",
    "milkomeda-c1-mainnet",
    "moonbeam-mainnet",
    "moonbeam-moonbase-alpha",
    "moonbeam-moonriver",
    "oasis-sapphire-mainnet",
    "oasys-mainnet",
    "opside-cb-zkevm",
    "opside-debox",
    "opside-era7",
    "opside-jackbot",
    "opside-law-chain",
    "opside-public-zkevm",
    "opside-relation",
    "opside-soquest-zkevm",
    "opside-vip3",
    "opside-xthrill",
    "opside-zkmeta",
    "optimism-goerli",
    "optimism-mainnet",
    "optimism-sepolia",
    "palm-mainnet",
    "pgn-mainnet",
    "polygon-zkevm-mainnet",
    "rollux-mainnet",
    "rsk-mainnet",
    "scroll-mainnet",
    "solana-mainnet",
    "sx-mainnet",
    "telos-mainnet",
    "tomochain-mainnet",
    "ultron-mainnet",
    "zksync-mainnet",
    "zora-mainnet",
  ];

const events = [
  { displayValue: "ERC20 token transfers",
   value: "erc20" },
  { displayValue: "Native token transfers", value: "nativetokens" },
  { displayValue: "Uniswap V3 swap events", value: "uniswapv3" }
]

  const getPrices = async (inputKey, inputEvent, inputChain) => {
    const client = new CovalentClient(inputKey);
    const r = await client.BaseService.getGasPrices(
      inputChain,
      inputEvent,
      "USD"
    );
    console.log(r);
    if (r.error) {
      setPrices({ first: "Error", second: "Error", third: "Error" });
    }
    if (!r.data.items[0].pretty_total_gas_quote) {
      setPrices({
        first: "Not Available",
        second: "Not Available",
        third: "Not Available",
      });
    } else {
      setPrices({
        first: r.data.items[0].pretty_total_gas_quote,
        second: r.data.items[1].pretty_total_gas_quote,
        third: r.data.items[2].pretty_total_gas_quote,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <p className="text-3xl font-bold inline-block p-5 text-red-400">
          COVALENT GAS PRICE CHECKER DASHBOARD
        </p>
      </div>
      <div className="flex space-y-8 mt-3 flex-col">
        <div className="w-full">
          <p className="my-2 text-xl font-bold">Covalent Unified API Key</p>
          <TextInput
            placeholder="Type/Paste Key here"
            type="text"
            onValueChange={setKey}
            value={key}
            color="rose"
          />
         
        </div>

        <div className="w-full">
          <p className="my-2 text-xl font-bold">
            Select a blockchain
          </p>
          <Select value={blockchain} onValueChange={setBlockchain}>
            {allBlockchains.map((item) => (
              <SelectItem value={item}>{item}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full">
          <p className="my-2 text-xl font-bold">
            Pick an event
          </p>
          <Select value={event} onValueChange={setEvent}>
            {events.map((item) => (
              <SelectItem value={item.value}>{item.displayValue}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-4">
        <Button
          color="rose"
          onClick={() => {
            if(!key && !event && !blockchain){
              alert("You haven't inputted any values");
              return;
            }
            getPrices(key, event, blockchain);
            window.location = "./#dashboard"
          }}
          className="w-full"
        >
          {" "}
          Get Gas Details
        </Button>
      </div>

      <div className="mt-5">
        <p className="m-8 text-3xl font-bold inline-block p-5 text-blue-900">
           Dashboard 
        </p>
        <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-3" id="dashboard">
          <Col>
            <Card>
              <Title>The Average Gas Price</Title>
              <Text>For 1 minute</Text>
              <Metric className="mt-4 text-blue-900">
                {loading ? <span className="text-sm text-blue-100">fetching price...</span> : prices.first}
              </Metric>
            </Card>
          </Col>
          <Col>
            <Card>
              <Title>The Average Gas Price</Title>
              <Text>For 3 minutes</Text>
              <Metric className="mt-4 text-blue-900">
                {loading ? <span className="text-sm text-blue-100">fetching price...</span> : prices.second}
              </Metric>
            </Card>
          </Col>
          <Col>
            <Card>
              <Title>The Average Gas Price</Title>
              <Text>For 5 minutes</Text>
              <Metric className="mt-4 text-blue-900">
                {loading ? <span className="text-sm text-blue-100">fetching price...</span> : prices.third}
              </Metric>
            </Card>
          </Col>
        </Grid>
      </div>

      <div className="mt-5">
        <h1 className="text-4xl font-bold text-red-600 my-5">IMPORTANT INFORMATION</h1>
      <AccordionList className="w-full bg-white">
    <Accordion >
      <AccordionHeader>Steps to Obtain Covalent Unified API key</AccordionHeader>
      <AccordionBody>
      To access the functionalities offered on this page via an API key, please go through the following steps:
      Head to the <a href="https://www.covalenthq.com/platform/" target="_blank" className="text-blue-500 underline">Covalent Platform</a>.
      Sign up or register on the platform to obtain your exclusive and distinct API key.
      </AccordionBody>
    </Accordion>
    <Accordion>
      <AccordionHeader>About Page</AccordionHeader>
      <AccordionBody>
      The creation of this Single-Page Application (SPA) was a contribution to the Covalent bounty initiative named "Build and Deploy a Chain-specific Gas Price Dashboard Using GoldRush Kit." This application empowers users by enabling them to input their Covalent API key, select a blockchain, and pick from diverse event types. Through this platform, users gain access to dynamically displayed gas prices correlated to the chosen event type within their selected blockchain. This interactive feature significantly enriches user interaction, offering insightful perspectives into gas prices associated with distinct activities on specific blockchains.
      </AccordionBody>
    </Accordion>
    <Accordion>
      <AccordionHeader>Best practice guide on the secure usage and non-retention of the user's API key</AccordionHeader>
      <AccordionBody>
      Our utmost priority revolves around safeguarding user security. Abiding by secure practices for API key utilization is imperative:
Firstly, maintain utmost confidentiality regarding your API key. Keep it strictly confidential, refraining from public disclosure or sharing it with unauthorized parties. Secondly, ensure secure storage of your API key in a protected environment, preventing exposure in insecure platforms or public repositories. Thirdly, conduct regular checks on your API key usage to detect any unauthorized access or suspicious activities promptly. Lastly, adhere to our non-retention policy for API keys; we prioritize responsible data management, refraining from unnecessary storage of your API key. These guidelines aim to bolster the secure and responsible handling of your API key, fortifying user trust in our platform's security measures..
      </AccordionBody>
    </Accordion>
  </AccordionList>
      </div>
    </>
  );
}

export default App;
