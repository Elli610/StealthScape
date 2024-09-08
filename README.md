# StealthScape :lock: :key:

Welcome to **StealthScape** - the first cross-chain, compliant Layer 2 solution designed for private transactions. Leveraging cutting-edge zero-knowledge technology and ring signatures, we ensure confidentiality without compromising compliance.


## Introduction :page_facing_up:

Blockchain technology has revolutionized transparency and security in digital transactions. However, this innovation often sacrifices privacy. **StealthScape** bridges this gap, offering a secure, confidential, and compliant platform for private transactions across various blockchains.

## Features :sparkles:

- **High Transaction Output**: Capable of processing a large number of transactions efficiently.
- **Confidential**: Ensures transaction privacy using ZK technology and ring signatures.
- **Plasma Based**: Leverages Plasma for scalable and secure off-chain transactions.
- **UTXO Based Model**: Utilizes an Unspent Transaction Output model for enhanced privacy.
- **Secured by ZK**: Incorporates zero-knowledge proofs for transaction validity without revealing sensitive data.
- **Modular**: A modular design supports diverse applications and scalability.

## Technical Overview :gear:

### Client
- **Built with Rust and TypeScript**: Rust for core logic and TypeScript for cryptographic operations.
- **LMDB for Data Management**: Uses Lightning Memory-Mapped Database for efficient key-value storage.
- **RiscZER0 for ZK Proofs**: Generates zero-knowledge proofs confirming the state verification process.

### Compliance Stack
- **KYC**: Ensures regulatory compliance before transactions.
- **Future Plans**: Integrate Harpie on-chain or dynamically with Polygon ID for enhanced compliance.

### Wallet Integration
- **Metamask custom SNAP**: Facilitates seamless on-chain interactions and transactions.

### Blockchain Compatibility
- **Cross-Chain Functionality**: Any evm chain could be integrated with StealthScape. We only need to deploy the smart contract on the target chain and start listening to it.
- 
Supported chains:
- Morph: 0x121f32fc1bfc852f872ad6611a8e613e430a27fb
- Hedera: 0x121f32fc1bfc852f872ad6611a8e613e430a27fb
- RootStock: 0x121f32fc1bfc852f872ad6611a8e613e430a27fb
- Kinto: 0x121f32fc1bfc852f872ad6611a8e613e430a27fb

## Practical Use Cases :briefcase:

- Banking secrecy for inner transactions.
- Confidential transactions in various sectors.
- Private payments and bridges.
- Privacy for commercial transactions.

## Getting Started :rocket:

To start using **StealthScape** for your private transactions, follow these steps:

1. **Clone the Repository**
2. **Install Dependencies**
3. **Follow the Setup Instructions**
   Detailed setup instructions are available in the different folders of the repo. Ensure you review these to properly configure your environment for **StealthScape**.

## Network Information
As the project is in its early stages, the network is currently operating in Proof of Authority (PoA) mode. 
The address responsible for publishing proofs on the root chains is 0xB3C2d0AA83cad06E9B66dBEC8135Cf7641F96BC8.

## Contribution :handshake:
This project is a poc built for ETHOnline 2024. It contains weaknesses and bugs that need to be fixed.
We do not encourage any contributions to this project at this time. However, we welcome feedback and suggestions for our code and technical improvement.

## Team :busts_in_silhouette:

- **Thomas Hussenet**, FinTech Engineer - *CTO @ Cypher Lab®*
- **Nathan Hervier**, FinTech Engineer - *CIO @ Cypher Lab*

---

Thank you for your interest in **StealthScape**. Together, we're setting a new standard for privacy and compliance in blockchain transactions. :rocket:
