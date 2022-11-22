class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateSellIn() {
    // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    if(this.name === 'Sulfuras, Hand of Ragnaros') return this.sellIn
    // At the end of each day our system lowers both values for every item
    let coef = -1
    return this.sellIn += coef
  }

  updateQuality() {
    // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    if(this.name === 'Sulfuras, Hand of Ragnaros') return this.quality
    // At the end of each day our system lowers both values for every item
    let coef = -1
    // Once the sell by date has passed, Quality degrades twice as fast
    if(this.sellIn < 0) coef = coef * 2
    // "Conjured" items degrade in Quality twice as fast as normal items
    if(this.name.includes('Conjured')) coef = coef * 2
    // "Aged Brie" actually increases in Quality the older it gets (1 point each day until sell in date, then 2 points each day)
    if(this.name === 'Aged Brie') coef = Math.abs(coef)
    // "Backstage passes", Quality drops to 0 after the concert
    if(this.name === 'Backstage passes to a TAFKAL80ETC concert' && this.sellIn < 0) return this.quality = 0
    // "Backstage passes", Quality increases by 1 when there are more than 10 days
    if(this.name === 'Backstage passes to a TAFKAL80ETC concert' && this.sellIn >= 10) coef = 1
    // "Backstage passes", Quality increases by 2 when there are 10 days or less
    if(this.name === 'Backstage passes to a TAFKAL80ETC concert' && this.sellIn < 10) coef = 2
    // "Backstage passes", Quality increases by 3 when there are 5 days or less
    if(this.name === 'Backstage passes to a TAFKAL80ETC concert' && this.sellIn < 5) coef = 3
    // The Quality of an item is never negative
    if(this.quality + coef < 0) return this.quality = 0
    // The Quality of an item is never more than 50
    if(this.quality + coef > 50) return this.quality = 50
    return this.quality += coef
  }


}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateSellIn()
      this.items[i].updateQuality()
    }

    return this.items
  }
}



module.exports = {
  Item,
  Shop
}
