import { TEST_URL_BASE } from "@/constants";
import Link from "next/link";
import { ReactNode } from "react";

const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'test' ? TEST_URL_BASE : '/';

interface LinkProps {
    datasetId?: string;
    children?: ReactNode;
}

export function DetailLink({ datasetId, children }: LinkProps) {
    return (
        <Link href={{
            pathname: `/detail/[id]`,
            query: {
                id: datasetId
            },
        }}
            as={`${baseUrl}detail/${datasetId}`}>
            {children}

        </Link>
    )
}

export function VisualisationLink({ datasetId, children }: LinkProps) {
    return (
        <Link href={{
            pathname: `/visualisation/[id]`,
            query: {
                id: datasetId
            },
        }}
            as={`${baseUrl}visualisation/${datasetId}`}
        >
            {children}
        </Link>
    )
}

export function OverviewLink({ children }: LinkProps) {
    return (
        <Link href={{
            pathname: `/`,
        }}
            as={baseUrl}
        >
            {children}
        </Link>
    )
}

export function AboutLink({ children }: LinkProps) {
    return (
        <Link href={{
            pathname: `/about`,
        }}
            as={`${baseUrl}about`}
        >
            {children}
        </Link>
    )

}