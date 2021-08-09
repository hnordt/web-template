import React from "react"
import { useLocation } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"
import Layout from "components/Layout"
import Card from "components/core/alpha/Card"
import Table from "components/core/alpha/Table"
import ModalForm from "components/core/alpha/ModalForm"
import useHandleEvent from "hooks/useHandleEvent"
import httpClient from "utils/httpClient"

const GROUP = "westfield"

export default function SitesScreen() {
  const location = useLocation()
  const handleEvent = useHandleEvent()

  const sitesQuery = useQuery(
    ["sites", GROUP],
    () =>
      httpClient
        .get(`/group/${GROUP}/sites/`, {
          params: {
            page: 1,
            limit: 2000,
          },
        })
        .then((response) => response.data),
    {
      select: (data) => data.results,
    }
  )

  const draftSite = sitesQuery.data?.find(
    (site) => site.id === new URLSearchParams(location.search).get("edit")
  )

  const createSiteMutation = useMutation((site: any) =>
    httpClient.post(`/group/${GROUP}/sites/`, {
      site: site.name,
      address: {
        street_1: site.streetAddress1,
        street_2: site.streetAddress2,
        area: site.area,
        city: site.city,
        state: site.state,
        zipcode: site.postalCode,
        country: site.country,
      },
    })
  )

  const updateSiteMutation = useMutation((site: any) =>
    httpClient.put(`/group/${GROUP}/sites/`, {
      id: site.id,
      site: site.name,
      address: {
        street_1: site.streetAddress1,
        street_2: site.streetAddress2,
        area: site.area,
        city: site.city,
        state: site.state,
        zipcode: site.postalCode,
        country: site.country,
      },
    })
  )

  const deleteSiteMutation = useMutation((site: any) =>
    httpClient.delete(`/group/${GROUP}/sites/`, {
      data: {
        id: site.id,
      },
    })
  )

  return (
    <Layout
      title="Sites"
      actions={[
        {
          label: "Create site",
          onClick: handleEvent({
            push: {
              search: `?new`,
            },
          }),
        },
      ]}
    >
      <Card>
        <Table
          columns={[
            {
              variant: "primary",
              label: "Name",
              accessor: "site",
            },
            {
              variant: "tertiary",
              label: "Location",
              accessor: (site) =>
                [site.address?.city, site.address?.state]
                  .filter(Boolean)
                  .join(", "),
            },
            {
              variant: "tertiary",
              label: "Stats",
              accessor: (site) =>
                `${site.devices} device${site.devices === 1 ? "" : "s"}, ${
                  site.member?.length
                } member${site.member?.length === 1 ? "" : "s"}`,
            },
          ]}
          query={sitesQuery}
          emptyState={{
            title: "No sites",
            description: "Get started by creating a new site",
          }}
          actions={[
            {
              icon: PencilIcon,
              onClick: handleEvent((site) => ({
                push: {
                  search: `?edit=${site.id}`,
                },
              })),
            },
          ]}
        />
      </Card>
      <ModalForm
        title="Create site"
        description="Fill in the information below to create a site"
        fields={[
          {
            type: "text",
            name: "name",
            label: "Name",
            autoComplete: "name",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "streetAddress1",
            label: "Street address 1",
            autoComplete: "address-line1",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "streetAddress2",
            label: "Street address 2",
            autoComplete: "address-line2",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "area",
            label: "Area",
            autoComplete: "address-level3",
            size: 6,
          },
          {
            type: "text",
            name: "city",
            label: "City",
            autoComplete: "address-level2",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "state",
            label: "State",
            autoComplete: "address-level1",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "postalCode",
            label: "Postal code",
            autoComplete: "postal-code",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "country",
            label: "Country",
            autoComplete: "country-name",
            size: 12,
            required: true,
          },
        ]}
        submitLabel="Save"
        mutation={createSiteMutation}
        open={location.search.includes("new")}
        onSuccess={handleEvent({
          toast: ["success", "Site created successfully!"],
          refetch: sitesQuery,
          push: {
            search: "",
          },
        })}
        onError={handleEvent((error) => ({
          toast: ["error", error.message],
        }))}
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      />
      <ModalForm
        title="Update site"
        description="Fill in the information below to update the site"
        fields={[
          {
            type: "text",
            name: "name",
            label: "Name",
            autoComplete: "name",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "streetAddress1",
            label: "Street address 1",
            autoComplete: "address-line1",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "streetAddress2",
            label: "Street address 2",
            autoComplete: "address-line2",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "area",
            label: "Area",
            autoComplete: "address-level3",
            size: 6,
          },
          {
            type: "text",
            name: "city",
            label: "City",
            autoComplete: "address-level2",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "state",
            label: "State",
            autoComplete: "address-level1",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "postalCode",
            label: "Postal code",
            autoComplete: "postal-code",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "country",
            label: "Country",
            autoComplete: "country-name",
            size: 12,
            required: true,
          },
        ]}
        defaultValues={
          draftSite
            ? {
                id: draftSite.id,
                name: draftSite.site,
                streetAddress1: draftSite.address.street_1,
                streetAddress2: draftSite.address.street_2,
                area: draftSite.address.area,
                city: draftSite.address.city,
                state: draftSite.address.state,
                postalCode: draftSite.address.zipcode,
                country: draftSite.address.country,
              }
            : undefined
        }
        submitLabel="Save"
        mutation={updateSiteMutation}
        actions={[
          {
            variant: "secondary",
            icon: TrashIcon,
            onClick: handleEvent({
              confirm: "Are you sure you want to delete this site?",
              mutateAsync: [
                deleteSiteMutation,
                draftSite,
                {
                  then: {
                    toast: ["success", "Site deleted successfully!"],
                    refetch: sitesQuery,
                    push: {
                      search: "",
                    },
                  },
                  catch: (error) => ({
                    toast: ["error", error.message],
                  }),
                },
              ],
            }),
          },
        ]}
        open={!!draftSite}
        onSuccess={handleEvent({
          toast: ["success", "Site updated successfully!"],
          refetch: sitesQuery,
          push: {
            search: "",
          },
        })}
        onError={handleEvent((error) => ({
          toast: ["error", error.message],
        }))}
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      />
    </Layout>
  )
}
