import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import RenderFormField from "./RenderFormField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "../ui/button";
import { addressSchema, AddressType } from "@/zod";

type AddressFormProps = {
  onSubmit: (data: any) => void;
  defaultValues?: UserAddress;
  isPending: boolean;
};

const AddressForm = ({
  onSubmit,
  defaultValues,
  isPending,
}: AddressFormProps) => {
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [districtId, setDistrictId] = useState<string | null>(null);
  const [wardId, setWardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            Token: import.meta.env.VITE_GATEWAY_API_KEY,
          },
        }
      );
      const data = await response.data;
      setProvinceData(data.data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (districtId) {
      const fetchDistricts = async () => {
        const response = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${districtId}`,
          {
            headers: {
              Token: import.meta.env.VITE_GATEWAY_API_KEY,
            },
          }
        );
        const data = await response.data;
        setDistrictData(data.data);
      };
      fetchDistricts();
    }
  }, [districtId]);

  useEffect(() => {
    if (wardId) {
      const fetchWards = async () => {
        const response = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${wardId}`,
          {
            headers: {
              Token: import.meta.env.VITE_GATEWAY_API_KEY,
            },
          }
        );
        const data = await response.data;
        setWardData(data.data);
      };
      fetchWards();
    }
  }, [wardId]);

  const form = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (defaultValues?.province) {
      setDistrictId(defaultValues?.province.split("-")[0]);
    }
    if (defaultValues?.district) {
      setWardId(defaultValues.district.split("-")[0]);
    }
  }, [defaultValues?.province, defaultValues?.district]);

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <RenderFormField
          title="Full Name"
          name="fullName"
          control={form.control}
          type="input"
        />
        <RenderFormField
          title="Phone Number"
          name="phoneNumber"
          control={form.control}
          type="input"
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <Select
                onValueChange={(value) => {
                  const [id] = value.split("-");
                  setDistrictId(id);
                  field.onChange(value);
                  setDistrictData([]);
                  setWardData([]);
                  form.setValue("district", undefined);
                  form.setValue("ward", undefined);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[315px]">
                  {provinceData.map((province) => (
                    <SelectItem
                      key={province.ProvinceID}
                      value={`${province.ProvinceID}-${province.ProvinceName}`}
                    >
                      {province.ProvinceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select
                onValueChange={(value) => {
                  const [id] = value.split("-");
                  setWardId(id);
                  field.onChange(value);
                  setWardData([]);
                  form.setValue("ward", undefined);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districtData.map((district) => (
                    <SelectItem
                      key={district.DistrictID}
                      value={`${district.DistrictID}-${district.DistrictName}`}
                    >
                      {district.DistrictName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ward</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a ward" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wardData.map((ward) => (
                    <SelectItem key={ward.WardID} value={ward.WardName}>
                      {ward.WardName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <RenderFormField
          title="Specify"
          name="specify"
          control={form.control}
          type="input"
        />
        <div className="flex justify-end items-center">
          <Button disabled={isPending}>Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
