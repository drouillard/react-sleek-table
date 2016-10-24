# Inherited a regrettable setup from original source project that makes it hard to refresh example project
# This script helps make it easier to update the example project
echo "### Build new source"
npm build

echo "### Update example project with new js"

cd example
echo `pwd`
rm -rf node_modules/react-sleek-table
rm bundle.js
npm i

echo "### Bundle up example project"
npm run build

cd ..
