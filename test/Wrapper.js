const { expect } = require("chai");

describe("Wrapper contract", function () {
    beforeEach(async function () {
        [
            this.owner, 
            this.addr1,
            this.addr2,
            this.addr3,
            ...addrs
        ] = await ethers.getSigners();

        this.AvaToken = await ethers.getContractFactory("AvaToken");
        this.tokenA = await this.AvaToken.connect(this.owner).deploy("Token A", "TA");
        this.tokenB = await this.AvaToken.connect(this.owner).deploy("Token B", "TB");
        this.tokenC = await this.AvaToken.connect(this.owner).deploy("Token C", "TC");

        this.WrapperContract = await ethers.getContractFactory("Wrapper");
        this.wrapperContract = await this.WrapperContract.connect(this.owner).deploy(this.tokenC.address);

        await this.tokenC.connect(this.owner).transferOwnership(this.wrapperContract.address);
        
    });
    
    it("Should swap/unswap with Token A", async function () {
        // swap
        await this.tokenA.mint(this.addr1.address, 100);
        expect(await this.tokenA.balanceOf(this.addr1.address)).to.equal('100');
        await this.tokenA.connect(this.addr1).approve(this.wrapperContract.address, 10);

        await this.wrapperContract.connect(this.addr1).swap(this.tokenA.address, 10);
        expect( await this.tokenC.balanceOf(this.addr1.address)).to.equal(10);
        expect( await this.tokenA.balanceOf(this.addr1.address)).to.equal(90);
    
        // unswap
        await this.tokenC.connect(this.addr1).approve(this.wrapperContract.address, 10);

        await this.wrapperContract.connect(this.addr1).unswap(this.tokenA.address, 10);
        expect( await this.tokenC.balanceOf(this.addr1.address)).to.equal(0);
        expect( await this.tokenA.balanceOf(this.addr1.address)).to.equal(100);
    });

    it("Should swap/unswap with Token B", async function () {
        // swap
        await this.tokenB.mint(this.addr1.address, 100);
        expect(await this.tokenB.balanceOf(this.addr1.address)).to.equal('100');
        await this.tokenB.connect(this.addr1).approve(this.wrapperContract.address, 10);

        await this.wrapperContract.connect(this.addr1).swap(this.tokenB.address, 10);
        expect( await this.tokenC.balanceOf(this.addr1.address)).to.equal(10);
        expect( await this.tokenB.balanceOf(this.addr1.address)).to.equal(90);
    
        // unswap
        await this.tokenC.connect(this.addr1).approve(this.wrapperContract.address, 10);

        await this.wrapperContract.connect(this.addr1).unswap(this.tokenB.address, 10);
        expect( await this.tokenC.balanceOf(this.addr1.address)).to.equal(0);
        expect( await this.tokenB.balanceOf(this.addr1.address)).to.equal(100);
    });
});
