import { 
    Contract, 
    ContractFactory 
  } from "ethers"
  import { ethers } from "hardhat"
  
  const main = async(): Promise<any> => {
    const Wrapper: ContractFactory = await ethers.getContractFactory("Wrapper")
    const wrapper: Contract = await Wrapper.deploy('0xC4f6Cf8Bca9774E8bBA11f9d0a4BB30eC52b7113')
  
    await wrapper.deployed()
    console.log(`Wrapper deployed to: ${wrapper.address}`)
  }
  
  main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  