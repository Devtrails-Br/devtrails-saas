# Landing Page Features Maps

## Campaign Landing Page - Minimalist and Direct

Esta estrutura é simples, focada em uma comunicação clara e rápida, ideal para usuários que tomam decisões rapidamente e preferem menos distrações.

### Features

- [ ] Header
- [ ] Hero com CTA principal
- [ ] Depoimentos de Clientes
- [ ] Seção de Benefícios/Serviços
- [ ] Seção de Prova Social
- [ ] CTA Secundário com Oferta Especial
- [ ] Footer

#### Landing Page Data

#### Header

- Exibir o logo a esquerda da tela

#### Hero com CTA principal

- Imagem de fundo impactante que transmite o valor do serviço prestado.
- Título direto e chamativo com proposta de valor clara (ex: "Transforme Seu Negócio com Nosso Serviço de [Serviço]").
- Subtítulo que explica brevemente os benefícios principais (ex: "Aumente sua produtividade e reduza custos com nosso time especializado").
- Botão CTA proeminente (ex: "Solicitar Cotação Gratuita").


#### Depoimentos de Clientes

- Seção de depoimentos de clientes satisfeitos, com nome e foto, para gerar confiança.
- Blocos com três depoimentos curtos que ressaltam os resultados obtidos.

table > testimonials

| Campo          | Tipo     | Obrigatório |
|----------------|----------|-------------|
| testimonial_id | uuid     | sim         |
| lp_id          | uuid     | sim         |
| title          | string   | sim         |
| subtitle       | string   | não         |

table > testimonials
  
| Campo                | Tipo     | Obrigatório |
|----------------------|----------|-------------|
| customer_id          | uuid     | sim         |
| testimonial_id       | uuid     | sim         |
| testimonial_actived  | boolean  | sim         |
| customer_name        | string   | sim         |
| customer_position    | string   | sim         |
| customer_company     | string   | não         |
| customer_testimonial | string   | sim         |
| customer_avatarUrl   | string   | sim         |

#### Seção de Benefícios/Serviços

- Blocos com ícones e textos curtos que destacam os principais benefícios do serviço.
- Exemplo: “Economia de tempo”, “Suporte especializado”, “Resultados garantidos”.

table > services

| Campo                   | Tipo     | Obrigatório |
|-------------------------|----------|-------------|
| service_id              | uuid     | sim         |
| lp_id                   | uuid     | sim         |
| service_title           | string   | sim         |
| service_description     | string   | sim         |
| service_iconUrl         | string   | sim         |

#### Seção de Prova Social

- Marcas ou empresas parceiras com as quais você já trabalhou (logotipos).
  
table > social_proofs

| Campo                     | Tipo     | Obrigatório |
|---------------------------|----------|-------------|
| social_proof_id           | uuid     | sim         |
| lp_id                     | uuid     | sim         |
| social_proof_company_name | string   | sim         |
| social_proof_logoUrl      | string   | sim         |

#### CTA Secundário com Oferta Especial

table > ctas

| Campo            | Tipo     | Obrigatório |
|------------------|----------|-------------|
| cta_id           | uuid     | sim         |
| lp_id            | uuid     | sim         |
| cta_title        | string   | sim         |
| cta_description  | string   | sim         |
| cta_action_text  | string   | sim         |

### Tabelas

table > organization

| Campo                                    | Tipo     | Obrigatório |
|------------------------------------------|----------|-------------|
| id                                       | uuid     | sim         |
| name                                     | string   | sim         |
| slug                                     | string   | sim         |
| domain                                   | string   | sim         |
| shoul_aAttach_users_by_domain            | boolean  | sim         |
| avatar_url                               | string   | sim         |

table > address

| Campo            | Tipo     | Obrigatório |
|------------------|----------|-------------|
| id               | uuid     | sim         |
| street           | string   | sim         |
| number           | string   | sim         |
| complement       | string   | não         |
| neighborhood     | string   | sim         |
| city             | string   | sim         |
| state            | string   | sim         |
| country          | string   | sim         |
| postalCode       | string   | sim         |

table > landing_pages

| Campo            | Tipo     | Obrigatório |
|------------------|----------|-------------|
| id               | uuid     | sim         |
| organization_id  | uuid     | sim         |
| name             | string   | sim         |
| logo             | string   | sim         |
| phone            | string   | sim         |
| cnpj             | string   | não         |
| type             | enum     | sim         |
| privacy          | string   | sim         |
| terms            | string   | sim         |
| cookies          | string   | sim         |
| address_id       | uuid     | sim         |
| social_media_id  | uuid     | sim         |
| page_title       | string   | sim         |
| page_favicon_url | string   | sim         |
| testimonials_id  | uuid     | sim         |
| lp_sections_id   | uuid     | sim         |

table > lp_sections

| Campo           | Tipo     | Obrigatório |
|-----------------|----------|-------------|
| id              | uuid     | sim         |
| lp_id           | uuid     | sim         |
| id              | uuid     | sim         |

table > social_medias

| Campo           | Tipo     | Obrigatório |
|-----------------|----------|-------------|
| social_media_id | uuid     | sim         |
| lp_id           | uuid     | sim         |
| name            | string   | sim         |
| icon_url        | string   | sim         |
| link_url        | string   | sim         |

table > heros

| Campo      | Tipo     | Obrigatório |
|------------|----------|-------------|
| hero_id    | uuid     | sim         |
| lp_id      | uuid     | sim         |
| title      | string   | sim         |
| subtitle   | string   | não         |
| img_hero   | string   | sim         |
