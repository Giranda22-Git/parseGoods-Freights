const getCategorieTree = function (products) {
  const allCategories = []

  for (const product of products) {
    allCategories.push(product.categories)
  }

  const result = allCategories.reduce( (tree, list) => ( mktree(tree,list),tree ), {} )

  return result
}

function mktree( sub, list ) {
  if( list.length === 0 ) return
  const subsub = sub[ list[ 0 ] ] = sub[ list[ 0 ] ] || {}
  mktree( subsub, list.slice(1) )
}

module.exports = getCategorieTree
