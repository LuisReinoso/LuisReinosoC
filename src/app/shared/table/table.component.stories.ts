import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';

const meta: Meta<TableComponent> = {
  component: TableComponent,
};

export default meta;
type Story = StoryObj<TableComponent>;

const generateProducts = (count: number) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      id: `${i}`,
      name: `Product ${i}`,
      description: `Description ${i}`,
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: new Date(2024, 0, i),
      date_revision: new Date(2025, 0, i),
    });
  }
  return products;
};

export const basic: Story = {
  args: {
    columnTitles: ['Logo', 'Nombre', 'Descripción', 'Fecha de liberación', 'Fecha de reestructuración'],
    columnNames: ['id', 'logo', 'name', 'description', 'date_release', 'date_revision'],
    columnInfo: ['', '', '', 'Descripción del producto', 'Fecha inicial', 'Fecha final'],
    data: generateProducts(50),
  },
};

export const extraColum: Story = {
  args: {
    columnTitles: ['Logo', 'Nombre', 'Descripción', 'Fecha de liberación', 'Fecha de reestructuración', 'Extra'],
    columnNames: ['id', 'logo', 'name', 'description', 'date_release', 'date_revision', 'extra'],
    columnInfo: ['', '', '', 'Descripción del producto', 'Fecha inicial', 'Fecha final', ''],
    data: [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: new Date('2024-01-30'),
        date_revision: new Date('2025-01-30'),
        extra: 'extra',
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: new Date('2024-01-15'),
        date_revision: new Date('2025-01-15'),
        extra: 'extra',
      },
      {
        id: '3',
        name: 'Product 3',
        description: 'Description 3',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: new Date('2024-02-10'),
        date_revision: new Date('2025-02-10'),
        extra: 'extra',
      },
      {
        id: '4',
        name: 'Product 4',
        description: 'Description 4',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: new Date('2024-03-05'),
        date_revision: new Date('2025-03-05'),
        extra: 'extra',
      },
      {
        id: '5',
        name: 'Product 5',
        description: 'Description 5',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: new Date('2024-04-20'),
        date_revision: new Date('2025-04-20'),
        extra: 'extra',
      },
    ],
  },
};
