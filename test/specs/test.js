global.fetch = require("node-fetch");
const chai = require('chai');

describe('Test list:', () => {
    it('Test: Verify results match the search criteria', async () => { 
        await browser.url('https://www.bayut.com');
        const locationUl = await $('div.ad62c515.a544e6c5._4a6228f4 > div > div > ul > input')
        await locationUl.setValue('Dubai Marina')
        await browser.pause(100)

        const location = await $('div.ad62c515.a544e6c5._4a6228f4 > div > div > div > ul > li:nth-child(1) > button')
        await location.click()

        const purpose = await $('div._580fbeeb._87de3797 > div.ad62c515._325092f0._4a6228f4 > div > div > span')
        await purpose.click()

        const purposeBuy = await $('div._0a772a68 > div > div:nth-child(1) > div > span:nth-child(1) > button')
        await purposeBuy.click()

        const find = await $('div._580fbeeb._8a6c9954 > a')
        await find.click()

        const prop= await $$('div.d6e81fd0 > div._4b74b8bb > div._7afabd84')
        await expect(prop).toHaveTextContaining('Dubai Marina')
    })
    it('Test: Verify Popular Searches links work correctly', async () => { 
      
      await browser.url('https://www.bayut.com');
      const rent = await $('div._2fddc99a > div:nth-child(2) > div > div > div:nth-child(2)')
      await rent.scrollIntoView()
      await rent.click()
      
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

