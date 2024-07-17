import { Input } from "@/components/ui/input";

const PulsaData = () => {
  return (
    <section className="relative p-0 overflow-y-scroll h-screen py-32">
      <div className="container">
        <div>
          <img src="gambar" alt="" />
          <p>PPOB</p>
        </div>
        <div className="flex justify-around p-2 shadow-xl items-center bg-red-600 rounded-xl">
          <p>Pulsa</p>
          <p>Paket Data</p>
        </div>
        <div>
          <p>Beli Pulsa</p>
          <p>Nomor Telepon</p>
          <Input />
        </div>
      </div>
    </section>
  );
};

export default PulsaData;
