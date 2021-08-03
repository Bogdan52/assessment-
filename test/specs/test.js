global.fetch = require("node-fetch");
const chai = require('chai');

describe('Test list:', () => {
    it('Test: Verify results match the search criteria', async () => { 
        //Open bayut.com
        await browser.url('https://www.bayut.com'); 
        //Select Dubai Marina as a location
        const locationUl = await $('div.ad62c515.a544e6c5._4a6228f4 > div > div > ul > input')
        await locationUl.setValue('Dubai Marina')
        await browser.pause(100)
        const location = await $('div.ad62c515.a544e6c5._4a6228f4 > div > div > div > ul > li:nth-child(1) > button')
        await location.click()
        //Select properties For Sale
        const purpose = await $('div._580fbeeb._87de3797 > div.ad62c515._325092f0._4a6228f4 > div > div > span')
        await purpose.click()
        const purposeBuy = await $('div._0a772a68 > div > div:nth-child(1) > div > span:nth-child(1) > button')
        await purposeBuy.click()
        //Search for properties
        const find = await $('div._580fbeeb._8a6c9954 > a')
        await find.click()
        //Verify that all displayed properties contain the selected location
        const prop= await $$('div.d6e81fd0 > div._4b74b8bb > div._7afabd84')
        await expect(prop).toHaveTextContaining('Dubai Marina')
    })

    it('Test: Verify Popular Searches links work correctly', async () => { 
      //Open bayut.com
      await browser.url('https://www.bayut.com');
      //Scroll down to the 'Popular searches'
      const rent = await $('div._2fddc99a > div:nth-child(2) > div > div > div:nth-child(2)')
      await rent.scrollIntoView()
      //Open the 'To rent' tab
      await rent.click()
      //Validate links under 'Dubai apartments'
      const dubaiAreaLinks= await $$(' div.fc910dcd > div > div:nth-child(1) > div._892154cd._6c5bbfd9._97cf2f2e > div > div > div._617311a2 > div:nth-child(1) > ul > li > a');
      const urls = dubaiAreaLinks.map(link => link.getAttribute('href'))
      const requests = urls.map(async(url) => fetch("https://www.bayut.com"+ await url))
      const responses = await Promise.all(requests);
      const statusCodes = await responses.map(response => response.status)
      statusCodes.forEach(statusCode => {  
        chai.expect(statusCode).to.be.below(400);
      })
    })
})

