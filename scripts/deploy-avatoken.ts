import { 
    Contract, 
    ContractFactory 
  } from "ethers"
  import { ethers } from "hardhat"
  
  const main = async(): Promise<any> => {
    const AvaToken: ContractFactory = await ethers.getContractFactory("AvaToken")
    const avaToken: Contract = await AvaToken.deploy('Token C', 'ATC')
  
    await avaToken.deployed()
    console.log(`AvaToken deployed to: ${avaToken.address}`)
  }
  
  main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  