import { Injectable } from '@nestjs/common';

type ForwardInput = {
    method: string;
    targetUrl: string;
    headers: Record<string, string>;
    body?: unknown;
};

type ForwardOutput = {
    status: number;
    body: unknown;
};

@Injectable()
export class ProxyService {
    async forward(input: ForwardInput): Promise<ForwardOutput> {
        const response = await fetch(input.targetUrl, {
            method: input.method,
            headers: input.headers,
            body: input.body === undefined ? undefined : JSON.stringify(input.body),
        });

        const text = await response.text();

        return {
            status: response.status,
            body: text ? JSON.parse(text) : null,
        };
    }
}