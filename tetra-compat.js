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

      default:
        dropItem = null;
    }

    if (dropItem) {
      event.block.popItem(dropItem);
    }
  }
});



