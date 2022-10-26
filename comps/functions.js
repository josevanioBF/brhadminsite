
module.exports = { 
    getAllOptions, 
};

// cria lista de todo tipo de departamento, ou escritorio existentes na empresa
function getAllOptions(planos, categ){
    const setOfOptions = new Set();
    planos.forEach(each => { if(each[`${categ}`]) setOfOptions.add(each[`${categ}`])} );
    return Array.from(setOfOptions);
}