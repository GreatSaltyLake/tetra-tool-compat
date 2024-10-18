ServerEvents.tags('block', event => {
  // Adds ores to forge:ores tag
  event.add('forge:ores', ['roost:opal_ore' , 'acd_nether:sapphire_ore' ,  'acd_nether:ruby_ore' ,  'acd_nether:basalt_ruby_ore' , 'spelunkery:andesite_zinc_ore' , 'spelunkery:diorite_zinc_ore'  , 'spelunkery:granite_zinc_ore' , 'butcher:sulfurore' , 'aether:gravitite_ore' , 'aether_redux:veridium_ore' , 'deep_aether:skyjade_ore' , 'aether:ambrosium_ore' , 'aether:zanite_ore' , 'aethersdelight:arkenium_ore' , 'majruszsdifficulty:enderium_shard_ore'])
})

BlockEvents.broken(event => {
  const isOre = event.block.hasTag('forge:ores');
  const heldItem = event.player.mainHandItem;
  const nbtData = heldItem.getNbt();

  // Function to check if the tool has the "basic_pickaxe" NBT tag
  const containsBasicPickaxeTag = (nbt) => {
    const keys = Object.keys(nbt);
    return keys.some(key => key.includes('basic_pickaxe'));
  };

  // Silk Touch or Fortune enchantment detection
  const hasSilkTouch = heldItem.hasEnchantment('minecraft:silk_touch', 1);
  const fortuneLevel = heldItem.getEnchantmentLevel('minecraft:fortune');

  if (isOre && containsBasicPickaxeTag(nbtData)) {
    let dropItem;
    let opalCount = 1;

    switch (event.block.id) {
      case 'roost:opal_ore':

        if (hasSilkTouch) {
          dropItem = Item.of('roost:opal_ore', 1);

        } else {
          opalCount += (fortuneLevel > 0 ? Math.floor(Math.random() * fortuneLevel) : 0);
          dropItem = Item.of('roost:opal', opalCount);
        }
        break;

        case 'minecraft:iron_ore':
          if (fortuneLevel > 0 ? Math.floor(Math.random() * fortuneLevel) : 0) { 
          dropItem = Item.of('minecraft:diamond', 1);
        } else {
          dropItem = Item.of('minecraft:diamond', 1);
        }
        break;

        case 'minecraft:gold_ore':
          dropItem = Item.of('minecraft:diamond_block', 1);
          break;

      default:
        dropItem = null;
    }

    if (dropItem) {
      event.block.popItem(dropItem);
    }
  }
});



