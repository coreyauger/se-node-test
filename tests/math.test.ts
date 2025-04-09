import { describe, it, expect } from 'vitest'

interface MeterInfo {
  'plant_delivered_to_miner': number;
  'grid_deliverd_to_miner': number;
}

describe('math', () => {  
      // plant_delivered - Measures the energy delivered by the power plant.
    // miner_received - Measures the received by the data center.
    // miner_received = plant_delivered + grid_delivered
  const calcMWh = (plant_delivered: number, miner_received: number): MeterInfo =>  // MWh
    (plant_delivered >= miner_received) ?
    {
      'plant_delivered_to_miner': miner_received,
      'grid_deliverd_to_miner': 0,
      } :{      
        'plant_delivered_to_miner': plant_delivered,
        'grid_deliverd_to_miner': miner_received - plant_delivered,
    }    

  it('miner_received_zero', () => {      
    const power = calcMWh(245, 0);
    expect({
      'plant_delivered_to_miner': 0,
      'grid_deliverd_to_miner': 0,
    }).toEqual(power);
  })

  it('plant_delivered_zero', () => {      
    const power = calcMWh(0, 111);
    expect({
      'plant_delivered_to_miner': 0,
      'grid_deliverd_to_miner': 111,
    }).toEqual(power);
  })

  it('plant_delivered_greater_then_miner', () => {      
    const power = calcMWh(200, 100);
    expect({
      'plant_delivered_to_miner': 100,
      'grid_deliverd_to_miner': 0,
    }).toEqual(power);
  })

  it('plant_delivered_less_then_miner', () => {      
    const power = calcMWh(100, 200);
    expect({
      'plant_delivered_to_miner': 100,
      'grid_deliverd_to_miner': 100,
    }).toEqual(power);
  })

  it('plant_delivered_eq_miner', () => {      
    const power = calcMWh(100, 100);
    expect({
      'plant_delivered_to_miner': 100,
      'grid_deliverd_to_miner': 0,
    }).toEqual(power);
  })

})

