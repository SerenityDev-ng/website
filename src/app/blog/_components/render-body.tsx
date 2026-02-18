import config from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";
import Image from "next/image";
import { Blog } from "../../../../types";
import { urlFor } from "@/sanity/lib/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// lazy-loaded image component
const ImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  return (
    <div className="my-10 overflow-hidden rounded-[15px]">
      <Image
        src={urlFor(value)}
        width={width}
        height={height}
        alt={value.alt || "blog image"}
        loading="lazy"
        style={{
          display: isInline ? "inline-block" : "block",
          aspectRatio: width / height,
        }}
      />
    </div>
  );
};

const FAQComponent = ({ value }: any) => {
  return (
    <Accordion type="single" collapsible className="w-full my-6">
      <AccordionItem value="item-1 border-none bg-gray-50 px-4 rounded-lg">
        <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
          {value.question}
        </AccordionTrigger>
        <AccordionContent className="text-gray-700 leading-relaxed">
          {value.answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const PricingTableComponent = ({ value }: any) => {
  return (
    <div className="my-8 border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-primary text-white">
          <TableRow className="hover:bg-primary/90">
            <TableHead className="text-white">Home Type</TableHead>
            <TableHead className="text-white">Location</TableHead>
            <TableHead className="text-white">Price Range</TableHead>
            <TableHead className="text-white">Team Size</TableHead>
            <TableHead className="text-white">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {value.rows?.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.homeType}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.teamSize}</TableCell>
              <TableCell>{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const components = {
  types: {
    image: ImageComponent,
    faq: FAQComponent,
    pricingTable: PricingTableComponent,
  },
};

const RenderBodyContent = ({ post }: { post: Blog }) => {
  return (
    <div className=" font-league-spartan">
      <PortableText value={post?.body as any} components={components} />
    </div>
  );
};

export default RenderBodyContent;
