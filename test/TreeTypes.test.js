const { expect } = require("chai");
const { formatUnits, parseUnits, parseEther } = require("@ethersproject/units");

let treeTypes;

describe("TreeTypes", async () => {
  before(async () => {
    const TreeTypes = await ethers.getContractFactory("TreeTypes");
    treeTypes = await TreeTypes.deploy();
  });

  it("should add new tree type by owner", async () => {
    const treeType = {
      name: "Cinar",
      O2Rate: 100,
      price: parseEther("0.001"),
    };
    await treeTypes.addTreeType(treeType.name, treeType.O2Rate, treeType.price);

    const storedTreeType = await treeTypes.getTreeTypeByName(treeType.name);

    expect(storedTreeType.name).to.be.eq(treeType.name);
    expect(storedTreeType.O2Rate).to.be.eq(treeType.O2Rate);
    expect(storedTreeType.price).to.be.eq(treeType.price);
  });
});
