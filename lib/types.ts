export interface Drink {
  id: string
  /**
   * Human‑readable name of the soft drink.
   */
  name: string
  /**
   * Country where the drink was originally created.
   */
  originCountry: string
  /**
   * Specific region or city of origin, if known.
   */
  region?: string
  /**
   * Year the drink was introduced to the market.
   */
  yearIntroduced: number
  /**
   * Brief descriptive summary of the drink.
   */
  description: string
}