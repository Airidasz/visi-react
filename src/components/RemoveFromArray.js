const RemoveItemFromArray = () => {
  const remove = (arr, item) => {
    var array = [...arr]; // make a separate copy of the array
    var index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }

    return array;
  };

  return remove;
};

export default RemoveItemFromArray;
