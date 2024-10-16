import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tree-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tree-types.component.html',
  styleUrl: './tree-types.component.css'
})
export class TreeTypesComponent {
  
    treeTypes = [
      {
        id: 11,
        name: 'Pine Tree',
        description: 'Evergreen tree commonly found in cold regions.',
        price: 25,
        imageUrl: 'assets/images/pine-tree.jpg',
      },
      {
        id: 12,
        name: 'Oak Tree',
        description: 'Deciduous tree known for its strength and long life.',
        price: 35,
        imageUrl: 'assets/images/oak-tree.jpg',
      },
      
        {
          id: 1,
          name: 'Apple Tree',
          description: 'Produces sweet and crisp apples. Grows best in cooler climates.',
          price: 50,
          imageUrl: 'assets/images/apple-tree.jpg',
        },
        {
          id: 2,
          name: 'Mango Tree',
          description: 'Produces juicy mangoes, loved for their sweetness and rich flavor. Thrives in tropical and subtropical climates.',
          price: 60,
          imageUrl: 'assets/images/mango-tree.jpg',
        },
        {
          id: 3,
          name: 'Orange Tree',
          description: 'Citrus tree that produces refreshing, vitamin-rich oranges. Suitable for warm climates.',
          price: 55,
          imageUrl: 'assets/images/orange-tree.jpg',
        },
        {
          id: 4,
          name: 'Pear Tree',
          description: 'Produces juicy, flavorful pears. Ideal for moderate climates.',
          price: 45,
          imageUrl: 'assets/images/pear-tree.jpg',
        },
        {
          id: 5,
          name: 'Cherry Tree',
          description: 'Yields delicious cherries, perfect for pies and fresh eating. Requires a temperate climate.',
          price: 70,
          imageUrl: 'assets/images/cherry-tree.jpg',
        },
        {
          id: 6,
          name: 'Peach Tree',
          description: 'Produces soft, juicy peaches. Grows best in warm, sunny areas.',
          price: 65,
          imageUrl: 'assets/images/peach-tree.jpg',
        },
        {
          id: 7,
          name: 'Pomegranate Tree',
          description: 'Bears ruby-red pomegranates rich in antioxidants. Thrives in warm, arid regions.',
          price: 55,
          imageUrl: 'assets/images/pomegranate-tree.jpg',
        },
        {
          id: 8,
          name: 'Lemon Tree',
          description: 'Citrus tree known for producing sour, vitamin C-rich lemons. Grows in warm to hot climates.',
          price: 40,
          imageUrl: 'assets/images/lemon-tree.jpg',
        },
        {
          id: 9,
          name: 'Avocado Tree',
          description: 'Produces creamy, nutrient-rich avocados. Prefers warm, tropical climates.',
          price: 75,
          imageUrl: 'assets/images/avocado-tree.jpg',
        },
        {
          id: 10,
          name: 'Fig Tree',
          description: 'Yields sweet, soft figs. Does well in warm and temperate climates.',
          price: 60,
          imageUrl: 'assets/images/fig-tree.jpg',
        }
      ];
      
  
    applyForTree(treeId: number) {
      // Logic to apply for the tree
      console.log(`Applied for tree with ID: ${treeId}`);
    }
  
    buyTree(treeId: number) {
      // Logic to purchase the tree
      console.log(`Buying tree with ID: ${treeId}`);
    }
  }
  
