async function main() {
    const TreeToken = await ethers.getContractFactory("TreeToken");
    const treeToken = await TreeToken.deploy();
  
    console.log("TreeToken deployed to:", treeToken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  