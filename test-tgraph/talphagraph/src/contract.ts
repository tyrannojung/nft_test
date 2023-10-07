import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Transfer as TransferEvent
} from "../generated/Contract/Contract"
import { Approval, ApprovalForAll, Transfer, Property } from "../generated/schema"

import { ipfs, json, JSONValue } from '@graphprotocol/graph-ts'

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const ipfshash = "QmQcnmTtQonYmacvjKJPT7XuePfvWoc2gpKe8C6PncU4tw";
  let tokenURI =  "/" + event.params.tokenId.toString();
  let property = Property.load(event.params.tokenId.toString());

  if (property == null) {
    property = new Property(event.params.tokenId.toString());

    let fullURI = ipfshash + tokenURI;
    let ipfsData = ipfs.cat(fullURI);

    if (ipfsData) {
      let ipfsValues = json.fromBytes(ipfsData);
      let ipfsValuesObject = ipfsValues.toObject();

      if (ipfsValuesObject) {
        let image = ipfsValuesObject.get('image');
        let attributes = ipfsValuesObject.get('attributes');

        let attributeArray: JSONValue[];
        if (image) {
          property.image = image.toString();
        }
        if (attributes) {

          attributeArray = attributes.toArray();

          for (let i = 0; i < attributeArray.length; i++) {

            let attributeObject = attributeArray[i].toObject();

            let trait_type = attributeObject.get('trait_type');
            let value_type = attributeObject.get('value');

            let trait: string;
            let value: string;

            if (trait_type && value_type) {

              trait = trait_type.toString();
              value = value_type.toString();

              if (trait && value) {

                if (trait == "Background") {
                  property.background = value;
                }

                if (trait == "Clothes") {
                  property.clothes = value;
                }

                if (trait == "Earring") {
                  property.earring = value;
                }

                if (trait == "Eyes") {
                  property.eyes = value;
                }

                if (trait == "Fur") {
                  property.fur = value;
                }

                if (trait == "Hat") {
                  property.hat = value;
                }

                if (trait == "Mouth") {
                  property.mouth = value;
                }

              }

            }

          }

        }

      }
    }
    
  }

  property.save();



}
