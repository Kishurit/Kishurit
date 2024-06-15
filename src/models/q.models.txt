import mongoose, { Schema, Document, Model, Types, model } from "mongoose";

interface Customer extends Document {
  customerType: "PrivateIndividual" | "Company" | "Freelancer";
  customer: Types.ObjectId;
}

// Интерфейсы для моделей Mongoose
interface PrivateIndividual extends Document {
  name: string;
  email: string;
}

interface Company extends Document {
  companyName: string;
  contactEmail: string;
}

interface Freelancer extends Document {
  freelancerName: string;
  services: string[];
}

interface Order extends Document {
  customerType: "PrivateIndividual" | "Company" | "Freelancer";
  customer: Types.ObjectId;
  amount: number;
}

const CustomerSchema = new Schema<Customer>({
  customerType: String,
  customer: {
    type: Schema.Types.ObjectId,
    refPath: "customerType",
  },
});

// Схемы Mongoose
const PrivateIndividualSchema = new Schema<PrivateIndividual>({
  name: String,
  email: String,
});

const CompanySchema = new Schema<Company>({
  companyName: String,
  contactEmail: String,
});

const FreelancerSchema = new Schema<Freelancer>({
  freelancerName: String,
  services: [String],
});

const OrderSchema = new Schema<Order>({
  customerType: String,
  customer: {
    type: Schema.Types.ObjectId,
    refPath: "customerType",
  },
  amount: Number,
});

// Модели Mongoose
export const CustomerModel = mongoose.model("Customer", CustomerSchema);

const PrivateIndividualModel = mongoose.model(
  "PrivateIndividual",
  PrivateIndividualSchema
);

const CompanyModel = mongoose.model("Company", CompanySchema);
const FreelancerModel = mongoose.model("Freelancer", FreelancerSchema);
export const OrderModel = mongoose.model("Order", OrderSchema);

// Функция, которая создает новый заказ
async function createOrder(
  customerType: "PrivateIndividual" | "Company" | "Freelancer",
  customerId: Types.ObjectId,
  amount: number
) {
  const newOrder = new OrderModel({
    customerType,
    customer: customerId,
    amount,
  });

  await newOrder.save();
  return newOrder;
}

async function createCustomer(
    customerType: "PrivateIndividual" | "Company" | "Freelancer",
    customerId: Types.ObjectId,
  ) {
    const newCustomer = new CustomerModel ({
      customerType,
      customer: customerId,
    });
  
    await newCustomer.save();
    return newCustomer;
  }
   
// Этот раздел подключится к базе данных и создаст примеры.
export async function runExample() {
  // Создание клиентов
  const johnDoe = await PrivateIndividualModel.create({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const acmeCorp = await CompanyModel.create({
    companyName: "Acme Corp",
    contactEmail: "info@acme.com",
  });

  const janeFreelancer = await FreelancerModel.create({
    freelancerName: "Jane",
    services: ["design", "development"],
  });

  const cust1 = await createCustomer("PrivateIndividual", johnDoe._id);
  const cust2 = await createCustomer("Company", acmeCorp._id);
  const cust3 = await createCustomer("Freelancer", janeFreelancer._id);

  // Создание заказов
  const order1 = await createOrder("PrivateIndividual", cust1.customer, 100);
  const order2 = await createOrder("Company", cust2.customer, 200);
  const order3 = await createOrder("Freelancer", cust3.customer, 300);
}
