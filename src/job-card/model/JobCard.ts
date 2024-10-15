export interface IJobCard {
    effectMonth: string
    sectionId: number
    sectionName: string
    itemSummeries: ItemSummery[]
  }
  
  export interface ItemSummery {
    pieceRateItemName: string
    pieceRateItemId: number
    qty: number
    productionPlanQty: number
    rateTypeDatas: RateTypeData[]
  }
  
  export interface RateTypeData {
    pieceRateItemName: string
    pieceRateItemId: number
    qty: number
    rateTypeName: string
    rateTypeId: number
  }